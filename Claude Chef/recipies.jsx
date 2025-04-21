import ReactMarkdown from 'react-markdown'
export default function Recipe(props){
    return(
        <section>
        <h2>Taste-Forge Recommands</h2>
        <ReactMarkdown className='suggested-recipe-container'>{props.recipe}</ReactMarkdown>
         </section>
)}