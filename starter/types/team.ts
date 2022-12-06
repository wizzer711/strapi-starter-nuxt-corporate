interface TeamMember {
    id: number
    name: string,
    role: string,
    image: object
}
export interface TeamMembers {
    teamMembers?: Array<TeamMember>
}