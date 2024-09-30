import './categorycard.css'; // Import the CSS file

const CategoryCard = ({ image, name }) => {
    return (
        <div className="category-card">
            <img src={image} alt={name} className="category-image" />
            <h4 className="category-name">{name}</h4>
        </div>
    );
};

export default CategoryCard;