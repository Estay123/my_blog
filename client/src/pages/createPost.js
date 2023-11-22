import React, { useState } from "react";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [author, setAuthor] = useState("");
  const [date, setDate] = useState("");

  function createNewPost(event) {
    event.preventDefault();
    const data = new FormData();
    data.append("title", title);
    data.append("file", file);
    data.append("summary", summary);
    data.append("paragraph", paragraph);
    data.append("author", author);
    data.append("date", date);

    fetch("http://localhost:4000/posts", {
      method: "POST",
      body: data,
    }).then((response) => {
      response
        .json()
        .then((body) => {
          console.log(body);
        })
        .catch((error) => {
          console.log("error: ", error);
        });
    });
  }

  return (
    <form className="createPost" onSubmit={createNewPost}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder="Summary"
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files[0])} />
      <input
        type="date"
        placeholder="date"
        value={date}
        onChange={(ev) => setDate(ev.target.value)}
      />
      <input
        type="author"
        placeholder="Author"
        value={author}
        onChange={(ev) => setAuthor(ev.target.value)}
      />

      <textarea
        placeholder="paragraph"
        rows={5}
        onChange={(ev) => setParagraph(ev.target.value)}
      />
      <button>Submit</button>
    </form>
  );
}
