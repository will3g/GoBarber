import Appointment from '../models/Appointment';
import User from '../models/User';

import { startOfDay, endOfDay, parseISO } from 'date-fns';
import { Op } from 'sequelize';

class ScheduleController {
  async index(req, res) {
    const checkUserProvider = await User.findOne({
      where: { id: req.userId , provider: true },
    });

    if(!checkUserProvider){
      return res.status(401).json({ error: 'User is not provider' });
    }

    const { date } = req.query;
    const parseDate = parseISO(date);

    // - CICLO -
    // 2019-09-05 00:00:00 > Inicio
    // 2019-09-05 23:59:59 > Fim

    const appointments = await Appointment.findAll({
      where: {
        provider_id: req.userId,
        canceled_at: null,
        date: {
          [Op.between]: [
            startOfDay(parseDate),
            endOfDay(parseDate),
          ],
        },
      },
      order: ['date'],
    });

    return res.json(appointments);
  }
}

export default new ScheduleController();
