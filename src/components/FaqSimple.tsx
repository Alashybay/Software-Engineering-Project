import { Container, Title, Accordion } from "@mantine/core";
import classes from "../styles/FaqWithImage.module.css";

export default function FaqSimple() {
  return (
    <>
      <Title ta="center" className={classes.title}>
        Frequently Asked Questions
      </Title>

      <Accordion variant="separated">
        <Accordion.Item className={classes.item} value="reset-password">
          <Accordion.Control>How does the recommendation system work?</Accordion.Control>
          <Accordion.Panel>
            Our recommendation system is designed to enhance your browsing experience by suggesting content that you might find interesting. It works based on the most liked system, where we recommend articles and posts that other users have liked the most. The system tracks how many users have "clicked" on or interacted with the same article, and those with higher engagement are suggested to other users. This approach leverages collective user behavior to bring you the most popular and relevant content.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="another-account">
          <Accordion.Control>How can I contact the support team?</Accordion.Control>
          <Accordion.Panel>
            If you need assistance or have any questions, our support team is here to help. You can contact the support team by sending an email request through our contact form available on the website. Please provide as much detail as possible about your issue to help us assist you better. Once your request is received, our team will review it and get back to you as soon as possible, typically within 24-48 hours.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="newsletter">
          <Accordion.Control>What does a subscription give me?</Accordion.Control>
          <Accordion.Panel>
            Subscribing to our service offers several benefits designed to enhance your user experience. As a subscriber, you receive the right to post content with a special badge indicating that you are a verified chef. This badge is displayed on all your posts, which can help increase your visibility and popularity within the community. Additionally, subscribers may receive exclusive content, early access to new features, and other perks that make the subscription worthwhile.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="credit-card">
          <Accordion.Control>What is the purpose of the map on the support page?</Accordion.Control>
          <Accordion.Panel>
            The map on our support page serves multiple purposes. Primarily, it shows the location of our support team, providing transparency and a sense of connection. Additionally, it displays your current location to make it easier for you to understand how to reach us or for us to assist you better. This feature ensures that you have a clear understanding of where we are based and facilitates smoother communication and support interactions.
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item className={classes.item} value="payment">
          <Accordion.Control>How can I save posts?</Accordion.Control>
          <Accordion.Panel>
            Saving posts that you find interesting or want to revisit later is easy. Simply click on the heart button associated with the post to add it to your favorites. Once saved, you can access your favorite posts at any time by visiting your profile's favorites section. This feature allows you to keep track of content that you find valuable and ensures that you can quickly find it whenever you need it.
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </>
  );
}
