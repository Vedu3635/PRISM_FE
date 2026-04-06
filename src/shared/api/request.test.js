import { describe, expect, it } from 'vitest';
import { request } from './request';

describe('request helper', () => {
  it('returns response data on success', async () => {
    const data = await request(async () => ({ data: { ok: true } }));
    expect(data).toEqual({ ok: true });
  });

  it('normalizes API errors', async () => {
    const error = {
      code: 'ERR_BAD_REQUEST',
      response: {
        status: 400,
        data: {
          error: 'Invalid payload',
        },
      },
    };

    await expect(request(async () => Promise.reject(error))).rejects.toMatchObject({
      message: 'Invalid payload',
      status: 400,
      code: 'ERR_BAD_REQUEST',
    });
  });
});

