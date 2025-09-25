import { useNavigate, useSearchParams } from "react-router-dom";

function usePagination(key: string = "page") {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const page = Number(searchParams.get(key) || 1);

  const setPage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, newPage.toString());
    navigate(`?${params.toString()}`);
  };

  return { page, setPage };
}

export default usePagination;
