import '@test/app.ts'
import '@test/app.js'
import '@test/style.scss'
import imagePath from '@test/image.svg'

import './index.css'
import { Game } from '@components/Game'

export default () => {
  return (
    <div className="main-container">
			<div className="header">
				<img src={imagePath} alt="Example Image"></img>
				<h1>Webpack Bundling</h1>
			</div>
			<div className="game-wrapper">
				<Game />
			</div>
    </div>
  )
}
