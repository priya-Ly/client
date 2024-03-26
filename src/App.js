import logo from "./logo.svg";
import "./App.css";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/getBlog";
import AdminAddBlog from "./components/AdminAddBlog";
import AdminBlogList from "./components/AdminBlogList";
import AddBlogA from "./components/AddBlogA";
import EditorAdd from "./components/EditorAdd";

function App() {
  return (
    <div className="App">
      {/* <AddBlog/>
    <BlogList/> */}
      {/* <AdminAddBlog />
      <AdminBlogList /> */}
      {/* <AddBlogA /> */}
      <EditorAdd/>
    </div>
  );
}

export default App;
