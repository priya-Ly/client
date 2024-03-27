import logo from "./logo.svg";
import "./App.css";
import AddBlog from "./components/AddBlog";
import BlogList from "./components/getBlog";
import AdminAddBlog from "./components/AdminAddBlog";
import AdminBlogList from "./components/AdminBlogList";
import AddBlogA from "./components/AddBlogA";
import EditorAdd from "./components/EditorAdd";
import AdminEditor from "./components/AdminEditor";
import CopyEd from "./components/CopyEd";
import ContentGets from "./components/AdminBlogList";

function App() {
  return (
    <div className="App">
      {/* <EditorAdd /> */}
      <CopyEd/>
      <ContentGets/>
    </div>
  );
}

export default App;
//   {/* <AddBlog/>
// <BlogList/> */}
//   {/* <AdminAddBlog />
//   <AdminBlogList /> */}
//   {/* <AddBlogA /> */}
//         {/* <AdminEditor /> */}
