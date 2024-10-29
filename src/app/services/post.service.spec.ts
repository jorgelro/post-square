import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PostService } from './post.service';
import { Post } from '../models/post.model';

describe('PostService', () => {
  let service: PostService;
  let httpTestingController: HttpTestingController;

  const mockPosts: Post[] = [
    { userId: 1, id: 1, title: 'Post 1', body: 'Content for post 1' },
    { userId: 2, id: 2, title: 'Post 2', body: 'Content for post 2' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PostService]
    });

    service = TestBed.inject(PostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch posts successfully', () => {
    service.getPosts().subscribe((posts) => {
      expect(posts).toEqual(mockPosts);
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(mockPosts);
  });

  it('should handle an error when fetching posts', () => {
    const errorMessage = 'Failed to load posts';

    service.getPosts().subscribe({
      next: () => fail('Expected an error, but got data instead'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Server Error');
      },
    });

    const req = httpTestingController.expectOne('https://jsonplaceholder.typicode.com/posts');
    expect(req.request.method).toEqual('GET');
    req.flush(errorMessage, { status: 500, statusText: 'Server Error' });
  });
});
