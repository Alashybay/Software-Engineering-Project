import { User as UserGoogle } from '@react-native-google-signin/google-signin'
import { User } from '@typings/user'

type AuthUserWithTokensResponse = {
  accessToken: string
  refreshToken: string
  user: User
}

type AppleAuthPayloadFullNameDto = {
  familyName: string | null
  givenName: string | null
  middleName: string | null
  namePrefix: string | null
  nameSuffix: string | null
  nickname: string | null
}





type AuthLocalPayload = {
  email: string
  password: string
}
