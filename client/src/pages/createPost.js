export default function createPost() {
  return (
    <form className="createPost">
      <input type="title" placeholder="Title" />
      <input type="summary" placeholder="summary" />
      <input type="file" />
      <textarea placeholder="paragraph" rows={5} />
      <button>Submit</button>
    </form>
  );
}
