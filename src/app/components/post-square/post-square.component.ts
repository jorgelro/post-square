import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPost } from '../../store/post.actions';
import { Post } from '../../models/post.model';
import { selectSelectedPostId } from '../../store/post.selector';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-post-square',
  templateUrl: './post-square.component.html',
  styleUrls: ['./post-square.component.scss'],
})
export class PostSquareComponent implements OnInit, OnDestroy {
  @Input() post!: Post;
  displayProperty: keyof Post = 'title';
  selectedPostId: number | null = null;
  private properties: (keyof Post)[] = ['title', 'userId', 'id', 'body'];
  private destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(selectSelectedPostId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(id => {
        this.selectedPostId = id;
        this.updateDisplayProperty();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get isSelected(): boolean {
    return this.selectedPostId === this.post.id;
  }

  updateDisplayProperty() {
    if (this.isSelected) {
      this.displayProperty =
        this.displayProperty === 'title' ? 'userId' : this.displayProperty;
    } else {
      this.displayProperty = 'title';
    }
  }

  onClick() {
    if (this.isSelected) {
      this.displayProperty = this.nextProperty();
    } else {
      this.displayProperty = 'userId';
      this.store.dispatch(selectPost({ postId: this.post.id }));
    }
  }

  private nextProperty(): keyof Post {
    const currentIndex = this.properties.indexOf(this.displayProperty);
    return this.properties[(currentIndex + 1) % this.properties.length];
  }
}
