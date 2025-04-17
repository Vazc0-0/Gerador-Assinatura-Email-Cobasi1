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
        df = pd.read_excel('Lojas_planilha.xlsx')

        # Verifica se as colunas esperadas existem
        if 'codigo' not in df.columns or 'nome' not in df.columns:
            return jsonify({"error": "O arquivo Excel deve conter as colunas 'codigo' e 'nome'."}), 400

        # Filtra apenas as colunas relevantes e converte para lista de dicionários
        lojas = df[['codigo', 'nome']].dropna().to_dict(orient='records')

        return jsonify(lojas)  # Retorna os dados como JSON
    except FileNotFoundError:
        return jsonify({"error": "Arquivo Excel não encontrado."}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
