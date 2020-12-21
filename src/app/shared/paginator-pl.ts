import { MatPaginatorIntl } from "@angular/material/paginator";

const plRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length == 0 || pageSize == 0) {
    return ((page * pageSize) + 1) + ' - ' + ((page * pageSize) + pageSize) + ' z ' + length;
  }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex =
    startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} z ${length}`;
};

export function getPlPaginatorIntl() {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Rekordów na stronie';
  paginatorIntl.nextPageLabel = 'Następna strona';
  paginatorIntl.previousPageLabel = 'Poprzednia strona';
  paginatorIntl.firstPageLabel = 'Pierwsza strona';
  paginatorIntl.lastPageLabel = 'Ostatnia strona';
  paginatorIntl.getRangeLabel = plRangeLabel;

  return paginatorIntl;
}
