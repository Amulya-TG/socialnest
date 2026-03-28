const FeedCard = ({ feed, onClick }) => {
  return (
    <>
      {feed.image && (
        <div className="card" onClick={onClick} style={{ cursor: "pointer" }}>
          <img src={feed.image} style={{ width: "100%" }}/>
        </div>
      )}
    </>
  );
};

export default FeedCard;
