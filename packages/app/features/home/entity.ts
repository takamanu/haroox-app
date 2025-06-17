export interface HomeContentProps {
  memberLevel: string
  memberName: string
  memberNumber: string
  memberExpirationDate: string
  selected: {
    practicalResearch: boolean
    paperExpertise: boolean
    lectures: boolean
  }
  toggleCheckbox: (key: string) => void
  handleRequestNaikKelas: () => void
  errorMessage: string
  linkTo: (param: string) => void
}

export interface MemberCardProps {
  memberName: string
  memberNumber: string
  memberExpirationDate: string
  memberLevel: string
}

export interface RequirementCardProps {
  selected: {
    practicalResearch: boolean
    paperExpertise: boolean
    lectures: boolean
  }
  toggleCheckbox: (key: string) => void
}
