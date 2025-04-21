from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições do frontend

@app.route('/')
def home():
    return "Servidor Flask está rodando! Acesse /lojas para ver os dados."

@app.route('/lojas', methods=['GET'])
def get_lojas():
    try:
        # Lê o arquivo Excel
        df = pd.read_excel(r'c:\Users\Gabriel Franco\Documents\GitHub\Gerador-Assinatura-Email-Cobasi1\back\Lojas_planilha.xlsx')

        # Remove espaços extras dos nomes das colunas
        df.columns = df.columns.str.strip()

        # Verifica se há pelo menos duas colunas no arquivo
        if len(df.columns) < 2:
            return jsonify({"error": "O arquivo Excel deve conter pelo menos duas colunas."}), 400

        # Seleciona as duas primeiras colunas, independentemente dos nomes
        df = df.iloc[:, :2]  # Seleciona apenas as duas primeiras colunas
        df.columns = ['codigo', 'nome']  # Renomeia as colunas para 'codigo' e 'nome'

        # Remove linhas com valores nulos e converte para lista de dicionários
        lojas = df.dropna().to_dict(orient='records')

        return jsonify(lojas)  # Retorna os dados como JSON
    except FileNotFoundError:
        return jsonify({"error": "Arquivo Excel não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
