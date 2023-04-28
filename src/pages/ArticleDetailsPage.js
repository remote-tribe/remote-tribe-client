import { jsx as _jsx } from "react/jsx-runtime";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';
import { useEffect, useState } from 'react';
import ArticleDetails from '../components/ArticleDetails';
const override = {
    display: 'block',
    margin: '0 auto',
    borderColor: 'red',
};
function ArticleDetailsPage() {
    const [article, setArticle] = useState({});
    const [loading, setLoading] = useState(true);
    const { articleId } = useParams();
    useEffect(() => {
        getArticle();
    }, []);
    const getArticle = () => {
        setLoading(true);
        axios
            .get(`${import.meta.env.VITE_BASE_URL}/api/community/article/${articleId}`)
            .then(({ data }) => {
            setLoading(false);
            data.comments = data.comments.reverse();
            setArticle(data);
        })
            .catch((error) => {
            setLoading(false);
            console.log(error);
        });
    };
    return loading ? (_jsx("div", { className: 'mt-60 flex justify-center text-center text-sky-400 ', children: _jsx(FadeLoader, { color: '#00a8e8', loading: loading, css: override, size: 150 }) })) : (_jsx("div", { className: 'container mx-auto space-y-8', children: _jsx(ArticleDetails, { setLoading: setLoading }) }));
}
export default ArticleDetailsPage;
