
import {Request, Response} from 'express';
import pool  from '../database';
class GamesController {
   public async list(req: Request, res: Response) {
       const games = await pool.query('select * from games');
       res.json(games);
    }
    public async getOne(req: Request, res: Response): Promise<any> {
        const {id} = req.params;
      const game = await pool.query('select * from games where id =?', [id]);
      if(game.length > 0){
          return res.json(game[0]);
      }
      res.status(404).json({text: 'game isnot founded'});
    }
    public async create(req: Request, res: Response):Promise<void> {
       await pool.query("insert into games set ? ", [req.body]);
        res.json({message: "game saved"});
    }
    public async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        await pool.query('delete from games where id = ?', [id]);
        res.json({message: 'game is deleted'})
    }
    public async update(req: Request, res: Response):Promise<void> {
        const {id} = req.params;
        await pool.query('update games set ? where id = ?', [req.body, id]);
        res.json({message: "the was updated"});
    }
}

 const gamesController = new GamesController();
 export default gamesController;