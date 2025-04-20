import '@test/app.ts'
//THERE"E DOESNT WORK IF NAMES OF FILE IS THE SAME, IT THINKS THAT IT ts BY DDEFAULT WHY!?!?
import '@test/ja.js'
import '@test/style.scss'
import imagePath from '@test/image.svg'

import './index.css'
import { Game } from '@components/Game'

export default () => {
  return (
    <div className="main-container">
			<div className="header">
				<img src={imagePath} alt="Example Image"></img>
				<h1>RollUp Bundling</h1>
			</div>
			<div className="game-wrapper">
				<Game />
			</div>
    </div>
  )
}
