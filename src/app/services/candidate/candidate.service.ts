import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFormattedCandidate } from '../../interfaces/formatted-candidate.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ApiRoutesEnum } from '../../enums/api-routes.enum';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  candidateBaseUrl: string = environment.apiUrl + ApiRoutesEnum.Candidate;
  candidates = new BehaviorSubject<IFormattedCandidate[]>([]);

  constructor(private httpClient: HttpClient) {
  }

  async getCandidatesFromServer(): Promise<void> {
    const candidates: IFormattedCandidate[] = await this.httpClient.get(this.candidateBaseUrl + ApiRoutesEnum.GetAllCandidate).toPromise() as IFormattedCandidate[];
    this.candidates.next(candidates);
  }

}
