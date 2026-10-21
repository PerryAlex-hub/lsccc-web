import assert from "node:assert/strict";
import { test } from "node:test";
import { paginateItems } from "../lib/admin/pagination.ts";

test("pagination covers every record once and preserves order", () => {
  const records = Array.from({ length: 27 }, (_, id) => ({ id }));
  const pages = [1, 2, 3].map((page) => paginateItems(records, page, 10));
  assert.deepEqual(
    pages.flatMap((page) => page.items),
    records,
  );
  assert.deepEqual(
    pages.map(({ start, end }) => [start, end]),
    [
      [1, 10],
      [11, 20],
      [21, 27],
    ],
  );
  assert.equal(pages[2].pageCount, 3);
  assert.equal(records.length, 27);
});

test("deleting the final record of the final page falls back to a valid page", () => {
  const remaining = Array.from({ length: 20 }, (_, id) => id);
  const result = paginateItems(remaining, 3, 10);
  assert.equal(result.page, 2);
  assert.deepEqual(result.items, remaining.slice(10));
  assert.equal(result.end, 20);
});

test("empty and filtered results have accurate counts without blank pages", () => {
  const empty = paginateItems([], 8, 10);
  assert.deepEqual(
    [empty.start, empty.end, empty.total, empty.page, empty.pageCount],
    [0, 0, 0, 1, 1],
  );
  const filtered = paginateItems(["matching article"], 5, 10);
  assert.deepEqual(filtered.items, ["matching article"]);
  assert.deepEqual(
    [filtered.start, filtered.end, filtered.total, filtered.page],
    [1, 1, 1, 1],
  );
});

test("exact page boundaries and media page sizes do not add extra pages", () => {
  const images = Array.from({ length: 24 }, (_, id) => id);
  const result = paginateItems(images, 2, 12);
  assert.equal(result.pageCount, 2);
  assert.deepEqual(result.items, images.slice(12));
  assert.equal(paginateItems(images, -1, 12).page, 1);
});
