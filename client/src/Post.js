export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img
          src="https://techcrunch.com/wp-content/uploads/2022/12/lawnmower-Large.jpeg?w=730&crop=1"
          alt="images"
        />
      </div>
      <div className="texts">
        <h2>now i have make a blog website</h2>
        <p className="info">
          <a className="author" href="/">
            yestay bakyt
          </a>
          <time>2023-01-06 14:23</time>
        </p>
        <p className="summary">today is hard evoluation to change</p>
      </div>
    </div>
  );
}
