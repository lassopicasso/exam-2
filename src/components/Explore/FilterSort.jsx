import React from "react";
import Header from "../../common/Header";
import { priceList, buttonList } from "../../constants/arrays";
function FilterSort({ handleSubmit, priceRange, setPriceRange, sort, setSort, expandFilterSort }) {
  function scrollUp() {
    window.scrollTo({ top: 50, behavior: "smooth" });
  }

  return (
    <form
      className="filterSortWrapper"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      style={{ display: expandFilterSort ? "block" : "none" }}
    >
      <div className="filterSort__content">
        <div className="filterSort__filter">
          <Header type="sub" header="Filter" />
          <div className="filterSort__price">
            <span> Total Price </span>
            {priceList.map((price, index) => {
              return (
                <label key={index}>
                  <input type="radio" name="filter_price" checked={priceRange.label === price.label} onChange={() => setPriceRange(price)} />
                  {price.label}
                </label>
              );
            })}
          </div>
        </div>
        <div className="filterSort__sort">
          <Header type="sub" header="Sort" />
          {buttonList.map((button, index) => {
            return (
              <div key={index}>
                <span>{button.title}</span>
                <div className="filterSort__buttons">
                  {button.btns.map((btn, index) => {
                    return (
                      <input
                        key={index}
                        className={`${btn.btn} sortBtn ${sort.type === button.type && sort.btn === btn.btn ? "sortBtn-active" : ""}`}
                        type="button"
                        value={btn.value}
                        onClick={() => {
                          setSort({ type: button.type, btn: btn.btn });
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <button className="cta__update cta" type="submit" onClick={() => scrollUp()}>
        Update
      </button>
    </form>
  );
}

export default FilterSort;
