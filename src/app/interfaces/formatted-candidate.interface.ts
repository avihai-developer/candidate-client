export interface IFormattedCandidate {
  name: string;
  works: {
    title: string;
    startDate: string;
    endDate: string;
    gapBetweenJobs?: string;
  }[];
}
