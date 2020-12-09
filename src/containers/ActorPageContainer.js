import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ActorGridComponent from "../components/ActorGridComponent";
import PaginationComponent from "../components/PaginationComponent";
import { FETCH_ACTORS } from "../reducers/ReducerTypes";
import ImdbService from "../services/ImdbService";

const ActorPage = ({ findActorsByName, actors }) => {
  let ref = useRef({});
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  const name = query.get("name");
  const page = parseInt(query.get("page"));
  if (ref.current.name !== name || ref.current.page !== page) {
    findActorsByName(name, page || 1);
  }

  useEffect(() => {
    ref.current = { name, page };
  });

  const getLinkForPage = (page) => {
    const query = new URLSearchParams(location.search);
    query.set("page", page);
    return location.pathname + "?" + query.toString();
  };

  return (
    <div>
      <ActorGridComponent actors={actors.results} />
      <div className="d-flex justify-content-center mt-4">
        <PaginationComponent
          numPages={actors.total_pages}
          currentPage={page || 1}
          getLinkForPage={(page) => getLinkForPage(page)}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { actors: state.actorReducer.actors };
};

const mapDispatchToProps = (dispatch) => {
  return {
    findActorsByName: (keyword, page) =>
      ImdbService.findActorsByName(keyword, page).then((actors) =>
        dispatch({
          type: FETCH_ACTORS,
          actors,
        })
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActorPage);
