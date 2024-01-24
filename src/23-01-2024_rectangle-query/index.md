Consider a rectangular h × w board with all cells initially white. You are to process several queries of the following types:

- "x a b" - color the white cell (a, b) (0-based coordinates, the first one is a row index, and the second one is a column index) black;
- "> a b" - find the leftmost white cell to the right of the white cell (a, b);
- "< a b" - find the rightmost white cell to the left of the white cell (a, b);
- "v a b" - the same, but the search should be done downwards;
- "^ a b" - the same, but the search should be done upwards;
For each query, except the ones of the first type, find the answer.

Example

For h = 3, w = 5, and
queries = ["v 1 2", "x 2 2", "v 1 2", "> 2 1", "x 2 3", "> 2 1", "< 2 0"],
the output should be
solution(h, w, queries) = [[2, 2], [-1, -1], [2, 3], [2, 4], [-1, -1]].

