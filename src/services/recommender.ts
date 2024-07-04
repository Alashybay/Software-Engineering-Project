import { Post } from "@/src/typings/post";
import { Preferences } from "@/src/typings/user";

type TermFrequency = Record<string, number>;
type DocumentFrequency = Record<string, number>;
type TfIdfValues = Record<string, number>;

class TfIdf {
  private documents: string[];
  private termFrequencies: TermFrequency[];
  private documentFrequencies: DocumentFrequency;
  private tfidfValues: TfIdfValues[];

  constructor(documents: string[]) {
    this.documents = documents;
    this.termFrequencies = [];
    this.documentFrequencies = {};
    this.tfidfValues = [];

    this.calculateTfIdf();
  }

  private calculateTermFrequency(document: string): TermFrequency {
    const terms = document.split(/\s+/);
    const termFrequency: TermFrequency = {};

    terms.forEach(term => {
      termFrequency[term] = (termFrequency[term] || 0) + 1;
    });

    return termFrequency;
  }

  private calculateDocumentFrequencies(): void {
    this.termFrequencies.forEach(termFrequency => {
      Object.keys(termFrequency).forEach(term => {
        this.documentFrequencies[term] = (this.documentFrequencies[term] || 0) + 1;
      });
    });
  }

  private calculateTfIdf(): void {
    this.documents.forEach(doc => {
      this.termFrequencies.push(this.calculateTermFrequency(doc));
    });

    this.calculateDocumentFrequencies();

    this.termFrequencies.forEach(termFrequency => {
      const tfidf: TfIdfValues = {};

      Object.keys(termFrequency).forEach(term => {
        const tf = termFrequency[term];
        const df = this.documentFrequencies[term];
        const idf = Math.log(this.documents.length / (1 + df));
        tfidf[term] = tf * idf;
      });

      this.tfidfValues.push(tfidf);
    });
  }

  public getTfIdf(docIndex: number): TfIdfValues {
    return this.tfidfValues[docIndex];
  }

  public calculateSimilarity(doc1Index: number, doc2Index: number): number {
    const tfidf1 = this.getTfIdf(doc1Index);
    const tfidf2 = this.getTfIdf(doc2Index);

    const uniqueTerms = new Set([
      ...Object.keys(tfidf1),
      ...Object.keys(tfidf2),
    ]);

    let dotProduct = 0;
    let magnitude1 = 0;
    let magnitude2 = 0;

    uniqueTerms.forEach(term => {
      const tfidf1Value = tfidf1[term] || 0;
      const tfidf2Value = tfidf2[term] || 0;

      dotProduct += tfidf1Value * tfidf2Value;
      magnitude1 += tfidf1Value * tfidf1Value;
      magnitude2 += tfidf2Value * tfidf2Value;
    });

    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    if (magnitude1 === 0 || magnitude2 === 0) {
      return 0;
    }

    return dotProduct / (magnitude1 * magnitude2);
  }
}

export class RecommenderSystem {
  private posts: Post[];
  private tfidfModel!: TfIdf;

  constructor(posts: Post[]) {
    this.posts = posts;
    this.initializeTfidfModel();
  }

  private initializeTfidfModel(): void {
    const docs = this.posts.map(post => `${post.recipe.cuisine} ${post.recipe.ingredients.map(ingredient => ingredient.name).join(' ')}`);
    this.tfidfModel = new TfIdf(docs);
  }

  public getRecommendedPosts(preferences?: Preferences): Post[] {
    if (!preferences) {
      return [];
    }

    const { cuisines = [], ingredients = [], allergies = [], glutenFreeOnly = false } = preferences;

    return this.posts.filter(post => {
      const recipe = post.recipe;
      const matchesCuisine = cuisines.length === 0 || cuisines.some(cuisine => cuisine.toLowerCase() === recipe.cuisine.toLowerCase());
      const matchesIngredients = ingredients.length === 0 || recipe.ingredients.some(ingredient =>
        ingredients.includes(ingredient.name.toLowerCase())
      );
      const avoidsAllergies = allergies.length === 0 || recipe.ingredients.every(ingredient =>
        !allergies.includes(ingredient.name.toLowerCase())
      );
      const matchesGlutenFree = !glutenFreeOnly || recipe.isGlutenFree;

      if (matchesCuisine && matchesIngredients && avoidsAllergies && matchesGlutenFree) {
        const docIndex = this.posts.indexOf(post);
        const doc1 = `${cuisines.join(' ')} ${ingredients.join(' ')}`;
        const similarity = this.tfidfModel.calculateSimilarity(docIndex, docIndex);
        return similarity > 0.1; // Adjust threshold as needed
      }

      return false;
    });
  }
}
