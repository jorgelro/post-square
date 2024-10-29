import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostState } from './post.reducer';

export const selectPostState = createFeatureSelector<PostState>('post');

export const selectAllPosts = createSelector(
  selectPostState,
  (state) => state?.posts || []
);

export const selectSelectedPostId = createSelector(
  selectPostState,
  (state) => state?.selectedPostId
);

export const selectSelectedPost = createSelector(
  selectAllPosts,
  selectSelectedPostId,
  (posts, selectedPostId) => posts.find((post) => post.id === selectedPostId) || null
);
