import PostsList from './components/PostsList';
import Contestants from './components/Contestants';
import "./Home.scss";
import { useState, useEffect } from 'react';


function Home() {
    const [name, setName] = useState("")

    const [contestants, setContestants] = useState({}); // Using an object to store contestants keyed by their ID

    useEffect(() => {
      const fetchContestants = async () => {
        try {
          const response = await fetch('https://193.31.31.105:25709/contestants');
          if (!response.ok) {
            console.log(response)
            throw new Error('Failed to fetch contestants');
          }
          const data = await response.json();
          const contestantsDict = data.reduce((acc, contestant) => {
            acc[contestant.id] = contestant;
            return acc;
          }, {});
          setContestants(contestantsDict);
        } catch (error) {
          console.error('Error fetching contestants:', error);
        }
      };
  
      fetchContestants();
    }, []); // The empty dependency array ensures this effect runs once on mount
    
 return(
    <div className="container">
        <div className="patrocinadores">
            <ul>
                <li>rede globo</li>
            </ul>
        </div>
        <nav>
            <span>OTadeuSchmidt</span>
            <h1>BBH</h1>                
        </nav>
        <div className="header">
        <img className="header--image" src="https://upload.wikimedia.org/wikipedia/commons/4/44/Logo_Big_Brother_Brasil.png" ></img>
        <div className={`header--participantes--nome ${name ? 'visible' : ''}`}><span>{name}</span></div>
        
            <div className="header--participantes">
                
                {Object.values(contestants).map((contestant) => (
                    
                    <div className='participante' onMouseEnter={() => setName(contestant.name)} onMouseLeave={() => setName("")}>
                        <div className='participante-avatar'>
                            <div className='participante-avatar-image'>
                                <img src={contestant.image_url} />
                            </div>
                            
                            <div className='participante-avatar-icon'></div>
                        </div>
                        <div className='participante-status'>{contestant.status == "Sem Status" ? "" : contestant.status}</div>
                    </div>
                ))}
            </div>
        </div>
        {/* <PostsList />     */}
    </div>

 )   
}

export default Home;