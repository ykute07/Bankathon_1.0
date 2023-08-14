import os

import pinecone
from langchain.chat_models import ChatOpenAI
from langchain.embeddings import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain.vectorstores import Pinecone
from langchain.chains import RetrievalQA
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationalRetrievalChain



def get_pdf_qa_chain_response(query, job_description, filename):

    chatgpt_model = ChatOpenAI(temperature=0, model_name='gpt-3.5-turbo-16k')

    embeddings = OpenAIEmbeddings()

    pinecone.init(
        api_key="my-key",  # find at app.pinecone.io
        environment="northamerica-northeast1-gcp",  # next to api key in console
    )
    index_name = "langchain1"

    vectorstore = Pinecone.from_existing_index(index_name, embeddings, namespace=filename)

    prompt_template = f"""You are an experienced hiring manager for a company. You will be given a job description and the resumes of candidates 
    to answer the user's question. Answer questions objectively, using the content from the job description to back up your answers.
      If the topic requested isn't in a candidate's resume, you can assume the candidate has no experience with the topic. 
      If you don't know the answer, just say that you don't know, don't try to make up an answer.

    Job Description:
    {job_description}

    Resumes:
    ```{{context}}```

    Question: {{question}}
    Helpful Answer: """


    qa_prompt = PromptTemplate(
        template=prompt_template, input_variables=["context", "question"]
    )

    memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

    chain_type_kwargs = {"prompt": qa_prompt}

    pdf_qa = ConversationalRetrievalChain.from_llm(
        llm=chatgpt_model,
        retriever=vectorstore.as_retriever(search_kwargs={'k': 50}),
        memory=memory,
        combine_docs_chain_kwargs={"prompt": qa_prompt}
    )

    result = pdf_qa.run(query)

    return result


