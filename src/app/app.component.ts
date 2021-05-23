import { Component } from '@angular/core';
import { CandidateService } from './services/candidate/candidate.service';
import { Observable } from 'rxjs';
import { IFormattedCandidate } from './interfaces/formatted-candidate.interface';
import { map } from 'rxjs/internal/operators/map';
import { TimesInMillisecondsEnum } from './enums/timesInMillisecondsEnum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  candidates: Observable<IFormattedCandidate[]> = this.getCandidatesObservable();

  constructor(private candidateService: CandidateService) {
    this.getCandidatesFromServer();
  }

  async getCandidatesFromServer(): Promise<void> {
    try {
      this.candidateService.getCandidatesFromServer();
    } catch (e) {
    }
  }

  getCandidatesObservable(): Observable<IFormattedCandidate[]> {
    return this.candidateService.candidates
      .pipe(
        map(value => {
          return this.addGapBetweenJobs(value);
        })
      );
  }


  private addGapBetweenJobs(candidates: IFormattedCandidate[]): IFormattedCandidate[] {
    for (const candidate of candidates) {
      for (let i = 0; i < candidate.works.length; i++) {
        if (candidate.works[i + 1]) {
          const gapBetweenJobs: number = new Date(candidate.works[i].startDate).getTime() - new Date(candidate.works[i + 1].endDate).getTime();
          switch (true) {
            case ((gapBetweenJobs / TimesInMillisecondsEnum.Year) > 1): {
              candidate.works[i].gapBetweenJobs = Math.floor(gapBetweenJobs / TimesInMillisecondsEnum.Year) + ' years';
              break;
            }
            case ((gapBetweenJobs / TimesInMillisecondsEnum.Month) > 1): {
              candidate.works[i].gapBetweenJobs = Math.floor(gapBetweenJobs / TimesInMillisecondsEnum.Month) + ' months';
              break;
            }
            default:
              if (Math.round(gapBetweenJobs / TimesInMillisecondsEnum.Day) > 0) {
                candidate.works[i].gapBetweenJobs = Math.floor(gapBetweenJobs / TimesInMillisecondsEnum.Day) + ' days';
              }
          }
          console.log('gapBetweenJobs', gapBetweenJobs);
        }
      }
    }
    return candidates;
  }
}
