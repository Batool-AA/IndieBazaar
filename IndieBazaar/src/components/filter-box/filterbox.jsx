import './filterbox.css'; // Import your CSS file

const FilterBox = () => {
    return (
        <div className="filter-box">
            <h3>Choose Category</h3>
            <div className="checkbox-container">
                <label>
                    <input type="checkbox" /> Food
                </label>
                <label>
                    <input type="checkbox" /> Accessories
                </label>
                <label>
                    <input type="checkbox" /> Clothes
                </label>
                <label>
                    <input type="checkbox" /> Decor
                </label>
            </div>
        </div>
    );
};

export default FilterBox;