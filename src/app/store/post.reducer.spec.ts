import { postReducer, PostState } from './post.reducer';
import * as PostActions from './post.actions';
import { Post } from '../models/post.model';
import { TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

describe('postReducer', () => {

  const initialState: PostState = {
    posts: [],
    selectedPostId: null,
    error: undefined
  };

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Content for post 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Content for post 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState })],
    });
  });

  it('should return the initial state when an unknown action is dispatched', () => {
    const action = { type: 'UNKNOWN' } as any;
    const state = postReducer(initialState, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadPostsSuccess and update the posts in the state', () => {
    const action = PostActions.loadPostsSuccess({ posts: mockPosts });
    const state = postReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      posts: mockPosts,
    });
  });

  it('should handle selectPost and update the selectedPostId in the state', () => {
    const postId = 1;
    const action = PostActions.selectPost({ postId });
    const state = postReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      selectedPostId: postId,
    });
  });

  it('should update only the selectedPostId without changing posts array when selectPost is called', () => {
    const stateWithPosts: PostState = {
      posts: mockPosts,
      selectedPostId: null,
      error: undefined
    };
    const postId = 2;
    const action = PostActions.selectPost({ postId });
    const state = postReducer(stateWithPosts, action);

    expect(state.posts).toEqual(mockPosts);
    expect(state.selectedPostId).toBe(postId);
  });
});
