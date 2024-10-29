import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { PostService } from './services/post.service';
import { loadPostsSuccess, loadPostsFailure } from './store/post.actions';
import { takeUntil } from 'rxjs/operators';
import { of, Subject } from 'rxjs';
import { selectAllPosts, selectSelectedPostId } from './store/post.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  posts$ = this.store.select(selectAllPosts);
  selectedPostId$ = this.store.select(selectSelectedPostId);

  constructor(private store: Store, private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts()
      .pipe(
        takeUntil(this.destroy$))
      .subscribe({
        next: (posts) => {
          this.store.dispatch(loadPostsSuccess({ posts }));
        },
        error: (error) => {
          this.store.dispatch(loadPostsFailure({ error }));
          return of([]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
