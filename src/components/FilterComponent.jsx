export const FilterComponent = ({ sortAsTrending, sortAsLatest }) => {
  return (
    <div>
      <button onClick={sortAsTrending}>
        <i className="fa-solid fa-fire"></i> Trending
      </button>
      <button onClick={sortAsLatest}>
        <i className="fa-solid fa-clock-rotate-left"></i> Latest
      </button>
    </div>
  );
};
