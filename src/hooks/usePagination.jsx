import { useState, useEffect } from 'react';
import scrollToTop from 'helpers/scrollToTop';

const usePagination = ({ contentPerPage, count }) => {
  const [page, setPage] = useState(1);
  // 3 крапки, які оточують найближчі сторінки
  const [gaps, setGaps] = useState({
    before: false,
    paginationGroup: [],
    after: true,
  });
  // загальна кількість сторінок (загальна кількість елементів / вміст на кожній сторінці)
  const pageCount = Math.ceil(count / contentPerPage);

  const lastContentIndex = page * contentPerPage;

  const firstContentIndex = lastContentIndex - contentPerPage;

  const [pagesInBetween, setPagesInBetween] = useState([]);

  useEffect(() => {
    if (pageCount > 2) {
      const temp = new Array(pageCount - 2).fill(1).map((_, i) => i + 2);
      setPagesInBetween(temp);
    }
  }, [pageCount]);

  //щоб встановити сторінки між проміжками залежно від положення поточної сторінки
  //і встановити крапки залежно від позиції поточної сторінки
  useEffect(() => {
    const currentLocation = pagesInBetween.indexOf(page);
    let paginationGroup = [];
    let before = false;
    let after = false;
    if (page === 1) {
      paginationGroup = pagesInBetween.slice(0, 3);
    } else if (
      page === pageCount ||
      page === pageCount - 1 ||
      page === pageCount - 2
    ) {
      paginationGroup = pagesInBetween.slice(-3, pageCount);
    } else if (page === 2) {
      paginationGroup = pagesInBetween.slice(
        currentLocation,
        currentLocation + 3
      );
    } else {
      paginationGroup = [page - 1, page, page + 1];
    }
    if (pageCount <= 5) {
      before = false;
      after = false;
    } else {
      before = false;
      after = false;
      if (paginationGroup[0] > 2) {
        before = true;
      }
      if (paginationGroup[2] < pageCount - 1) {
        after = true;
      }
    }
    setGaps({ paginationGroup, before, after });
  }, [page, pagesInBetween, pageCount]);

  // змінити сторінку залежно від напрямку передньої або зворотної сторони
  const changePage = direction => {
    setPage(state => {
      // йти далі
      if (direction) {
        // якщо сторінка остання, нічого не робити
        if (state === pageCount) {
          return state;
        }
        return state + 1;
        // повернутися назад
      } else {
        // якщо сторінка є першою сторінкою, нічого не робити
        if (state === 1) {
          return state;
        }
        return state - 1;
      }
    });
  };

  const setPageSAFE = num => {
    // якщо кількість перевищує кількість сторінок, установити останню сторінку
    if (num > pageCount) {
      setPage(pageCount);
      // якщо число менше 1, установіть першу сторінку
    } else if (num < 1) {
      setPage(1);
    } else {
      setPage(num);
    }
  };

  return {
    totalPages: pageCount,
    nextPage: () => {
      changePage(true);
      scrollToTop();
    },
    prevPage: () => {
      changePage(false);
      scrollToTop();
    },
    setPage: setPageSAFE,
    firstContentIndex,
    lastContentIndex,
    page,
    gaps,
  };
};

export default usePagination;
