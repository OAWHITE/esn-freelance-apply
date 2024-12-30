import {ActivatedRoute, ResolveFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {EsnService} from "../../shared/services/esn.service";
import {catchError, map, of} from "rxjs";
import {EnsResponse} from "../../shared/model/EnsResponse";

export const esnUpdateResolver: ResolveFn<EnsResponse | null> = (route, state) => {
  const esnService = inject(EsnService);
  const router = inject(Router)
  const esnId = route.params['id'];
  return esnService.esnGetById(esnId).pipe(
    map(data => data),
    catchError((error) => {
      router.navigate(['/esn/list'])
      return of(null);
    })
  );
}

