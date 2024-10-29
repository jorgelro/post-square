import { createReducer, on } from '@ngrx/store';
import * as PostActions from './post.actions';
import { Post } from '../models/post.model';

export interface PostState {
  posts: Post[];
  selectedPostId: number | null;
  error: any; //Just for demonstration purposes
}

const initialState: PostState = {
  posts: [],
  selectedPostId: null,
  error: null
};

export const postReducer = createReducer(
  initialState,
  on(PostActions.loadPostsSuccess, (state, { posts }) => ({
    ...state,
    posts,
    error: null
  })),
  on(PostActions.selectPost, (state, { postId }) => ({
    ...state,
    selectedPostId: postId
  })),
  on(PostActions.loadPostsFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
