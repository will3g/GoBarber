import Bee from 'bee-queue';
import CancellationMail from '../app/jobs/CancellationMail';
import redisConfig from '../config/redis';

const jobs = [CancellationMail]; //1 - Para cada um desses jobs...

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() { //2 - criamos uma fila...
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, { //3 - Que armazenamos o "bee", que é a instância
        //que se conecta com o redis, que é responsável por armazenar e recuperar
        //informações do banco de dados...
          redis: redisConfig,
        }),
        handle, //4 - E temos o handle que é responsável pelo processamento desses jobs...
      };
    });
  }

  add(queue, job) { //5 - Armazena o job dentro da fila...
    return this.queues[queue].bee.createJob(job).save();
  }

  processQueue() {//6 - O processQueue é responsável pelo processamento em tempo real,
    //logo toda vez que um job for adicionado via "add(queue, job) { ... }", o processeQueue()
    //vai executar o processo em segundo plano (background)...
    jobs.forEach(job => {
      const { bee, handle } = this.queues[job.key];

      bee.on('failed', this.handleFailure).process(handle);
      // Se sucesso "try" >>> bee.process(handle)
      // Se falhar temos quase que um "catch" >>> bee.on('failed', this.handleFailure)
    });
  }

  handleFailure(job, err) {
    console.log(`Queue ${job.queue.name}: FAILED`, err);
  }
}

export default new Queue();
