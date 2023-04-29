import { render, screen } from "@testing-library/react";
import MovieDetailsPage from "main/pages/Movies/MovieDetailsPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: () => ({
        id: 3
    }),
    useNavigate: () => mockNavigate
}));

jest.mock('main/utils/movieUtils', () => {
    return {
        __esModule: true,
        movieUtils: {
            getById: (_id) => {
                return {
                    movie: {
                        id: 3,
                        title: "Monsters, Inc.",
                        rating: 8.1,
                        views: 2000000
                    }
                };
            }
        }
    };
});

describe("MovieDetailsPage tests", () => {

    const queryClient = new QueryClient();
    test("renders without crashing", () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
    });

    test("loads the correct fields, and no buttons", async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <MemoryRouter>
                    <MovieDetailsPage />
                </MemoryRouter>
            </QueryClientProvider>
        );
        expect(screen.getByText("Monsters, Inc.")).toBeInTheDocument();
        expect(screen.getByText(8.1)).toBeInTheDocument();
        expect(screen.getByText(2000000)).toBeInTheDocument();

        expect(screen.queryByText("Delete")).not.toBeInTheDocument();
        expect(screen.queryByText("Edit")).not.toBeInTheDocument();
        expect(screen.queryByText("Details")).not.toBeInTheDocument();
    });

});
