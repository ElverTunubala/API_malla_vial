
export default function BordilloComponent() {
  return (
    <form>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
        number
        </label>
        <input
          type="text"
          className="form-control"
          id="number"
          aria-describedby="emailHelp"
        />
        
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
        length
        </label>
        <input
          type="number"
          className="form-control"
          id="length"
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
        directionNomenclature
        </label>
        <input
          type="text"
          className="form-control"
          id="directionNomenclature"
        />
      </div>
      
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
