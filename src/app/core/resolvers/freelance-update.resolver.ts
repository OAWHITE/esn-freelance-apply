import {ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {catchError, map, of} from "rxjs";
import {FreelanceService} from "../../shared/services/freelance.service";
import {FreelanceResponse} from "../../shared/model/FreelanceResponse";

export const freelanceUpdateResolver: ResolveFn<FreelanceResponse | null> = (route, state) => {
  const freelanceService = inject(FreelanceService);
  const router = inject(Router)
  const freelanceId = route.params['id'];
  return freelanceService.getFreelanceById(freelanceId).pipe(
    map(data => data),
    catchError((error) => {
      router.navigate(['/freelance/list'])
      return of(null);
    })
  );
};
