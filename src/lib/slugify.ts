export function slugify(s: string): string {
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\u4e00-\u9fa5-]+/g, '') // Remove all non-word chars (keeping Chinese)
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start
    .replace(/-+$/, ''); // Trim - from end
}
