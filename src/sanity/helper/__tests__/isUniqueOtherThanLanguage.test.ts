import { isUniqueOtherThanLanguage } from '../isUniqueOtherThanLanguage';
import { SlugValidationContext } from 'sanity';

// Mock the client
const mockClient = {
  fetch: jest.fn(),
};

const mockGetClient = jest.fn(() => mockClient);

describe('isUniqueOtherThanLanguage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return true when document has no language property', async () => {
    const context: SlugValidationContext = {
      document: { _id: 'test-id' },
      getClient: mockGetClient,
    } as any;

    const result = await isUniqueOtherThanLanguage('test-slug', context);
    expect(result).toBe(true);
    expect(mockGetClient).not.toHaveBeenCalled();
  });

  it('should return true when document is undefined', async () => {
    const context: SlugValidationContext = {
      document: undefined,
      getClient: mockGetClient,
    } as any;

    const result = await isUniqueOtherThanLanguage('test-slug', context);
    expect(result).toBe(true);
    expect(mockGetClient).not.toHaveBeenCalled();
  });

  it('should query client when document has language property', async () => {
    mockClient.fetch.mockResolvedValue(true);

    const context: SlugValidationContext = {
      document: {
        _id: 'test-id',
        language: 'en',
      },
      getClient: mockGetClient,
    } as any;

    const result = await isUniqueOtherThanLanguage('test-slug', context);

    expect(mockGetClient).toHaveBeenCalledWith({ apiVersion: '2023-04-24' });
    expect(mockClient.fetch).toHaveBeenCalledWith(
      expect.stringContaining('!defined(*['),
      {
        draft: 'drafts.test-id',
        published: 'test-id',
        language: 'en',
        slug: 'test-slug',
      }
    );
    expect(result).toBe(true);
  });

  it('should handle draft document IDs by removing drafts prefix', async () => {
    mockClient.fetch.mockResolvedValue(false);

    const context: SlugValidationContext = {
      document: {
        _id: 'drafts.test-id',
        language: 'zh',
      },
      getClient: mockGetClient,
    } as any;

    const result = await isUniqueOtherThanLanguage('another-slug', context);

    expect(mockClient.fetch).toHaveBeenCalledWith(
      expect.any(String),
      {
        draft: 'drafts.test-id',
        published: 'test-id',
        language: 'zh',
        slug: 'another-slug',
      }
    );
    expect(result).toBe(false);
  });

  it('should use correct GROQ query structure', async () => {
    mockClient.fetch.mockResolvedValue(true);

    const context: SlugValidationContext = {
      document: {
        _id: 'test-id',
        language: 'en',
      },
      getClient: mockGetClient,
    } as any;

    await isUniqueOtherThanLanguage('test-slug', context);

    const [query] = mockClient.fetch.mock.calls[0];
    expect(query).toContain('!defined(*[');
    expect(query).toContain('!(_id in [$draft, $published])');
    expect(query).toContain('slug.current == $slug');
    expect(query).toContain('language == $language');
    expect(query).toContain('][0]._id)');
  });

  it('should return the client fetch result', async () => {
    const testCases = [true, false];

    for (const expectedResult of testCases) {
      mockClient.fetch.mockResolvedValue(expectedResult);

      const context: SlugValidationContext = {
        document: {
          _id: 'test-id',
          language: 'en',
        },
        getClient: mockGetClient,
      } as any;

      const result = await isUniqueOtherThanLanguage('test-slug', context);
      expect(result).toBe(expectedResult);
    }
  });

  it('should handle client fetch errors', async () => {
    const error = new Error('Sanity client error');
    mockClient.fetch.mockRejectedValue(error);

    const context: SlugValidationContext = {
      document: {
        _id: 'test-id',
        language: 'en',
      },
      getClient: mockGetClient,
    } as any;

    await expect(isUniqueOtherThanLanguage('test-slug', context))
      .rejects.toThrow('Sanity client error');
  });

  it('should handle different language values', async () => {
    const languages = ['en', 'zh', 'fr', 'de'];
    mockClient.fetch.mockResolvedValue(true);

    for (const language of languages) {
      const context: SlugValidationContext = {
        document: {
          _id: 'test-id',
          language,
        },
        getClient: mockGetClient,
      } as any;

      await isUniqueOtherThanLanguage('test-slug', context);

      expect(mockClient.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          language,
        })
      );
    }
  });
});