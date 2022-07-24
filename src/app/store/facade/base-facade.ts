import { Injectable, OnDestroy } from "@angular/core";
import { select,Action, Store,MemoizedSelectorWithProps } from "@ngrx/store";
import { Subject } from "rxjs";
import { take,takeUntil} from 'rxjs/operators';



@Injectable({
    providedIn:'root'
})
export abstract class BaseFacade implements OnDestroy {

    readonly destroyed$ : Subject<any> = new Subject<any>();
    protected constructor(protected state$:Store<any>){
        
    }
    readonly dispatch = (action:Action) => this.state$.dispatch(action);

    readonly takeOne = <T,U,V>(
            selector:MemoizedSelectorWithProps<T,U,V>,
            params?:any
        ) => this.state$.pipe(select(selector,params),take(1));

    readonly takeAll = <T,U,V>(
        selector:MemoizedSelectorWithProps<T,U,V>,
        params?:any
    ) => {
            return this.state$.pipe(select(selector, params), takeUntil(this.destroyed$));
        };

    ngOnDestroy(): void {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
}