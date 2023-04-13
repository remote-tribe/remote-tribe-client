import { useParams } from 'react-router-dom';




function () {

    const { projectId } = useParams();
    const deleteProject = () => {                    //  <== ADD
        // Make a DELETE request to delete the project

        axios
            .delete(`/community/article/${articleId}`)
            .then(() => {
                // Once the delete request is resolved successfully
                // navigate back to the list of projects.
                navigate("/projects");
            })
            .catch((err) => console.log(err));
    };

    return (
        <div className="container mx-auto p-4 space-y-8">

        </div>
    );
}

export default App;
