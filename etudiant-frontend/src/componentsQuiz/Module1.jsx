import { useDispatch } from "react-redux";
import { useNavigate,useParams } from "react-router-dom";

const Module1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {id} = useParams();

  const finishModule = () => {
    dispatch({ type: "FINISH_MODULE_1" });
    window.scrollTo(0, 0);
    navigate(`/course/${id}/module2`);
  };

 const module1Content = [
  "React Props are like function arguments in JavaScript and attributes in HTML.",
  "To send props into a component, use the same syntax as HTML attributes.",
  "Example: Add a brand attribute to the Car element.",
  "The component receives the argument as a props object.",
  "The name of the object is props, but you can call it anything you want.",
  "You can use myobj instead of props in the component.",
  "Pass multiple properties: You can send as many attributes as you want.",
  "Every attribute is sent to the Car component as object properties.",
  "React props can be of any data type, including variables, numbers, strings, objects, arrays, and more.",
  "Strings can be sent inside quotes, numbers/variables inside curly brackets.",
  "Objects and Arrays can also be sent inside curly brackets.",
  "The component treats objects like objects, and you can use the dot notation to access properties.",
  "Array props can be accessed using indexes.",
  "You can pass props from one component to another as parameters.",
  "Props are read-only: changing them inside a component will cause an error.",
  "React encourages unidirectional data flow through props from parent to child.",
  "Props improve reusability and flexibility of components.",
  "You can combine props with state to create dynamic and interactive components.",
  "Using descriptive prop names helps maintain readable and maintainable code.",
  "Mastering props is essential for building scalable React applications."
];

  return (
    <div className="module-page">
      <h2 className="module-title">Module 1: React Props</h2>

      <video controls className="module-video">
        <source src="/videos/vid1.mp4" type="video/mp4" />
      </video>

      <div className="module-content">
        {module1Content.map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      <button className="btn primary module-button" onClick={finishModule}>
        Finish Module 1 → Module 2
      </button>
    </div>
  );
};

export default Module1;
