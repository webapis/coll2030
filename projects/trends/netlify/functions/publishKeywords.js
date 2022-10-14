
require('dotenv').config()

const { Octokit } = require("@octokit/rest");
const uri = process.env.MONGODB_URL
debugger
const octokit= new Octokit({ auth: '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'})
const fetch= require('node-fetch')
debugger
exports.handler = async function (event, context) {
debugger

  if (event.httpMethod === 'OPTIONS') {

    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST'
    };

    // To enable CORS
    return {
      statusCode: 200, // <-- Important!
      headers,
      body: 'This was not a POST request!'
    };

  }

  else if (event.httpMethod === 'POST') {
    debugger
    try {      


const body = JSON.stringify({ ref: 'trends-master', inputs: {  } })

const response = await triggerAction({ gh_action_url: `https://api.github.com/repos/webapis/coll2030/actions/workflows/generateKeywords.yml/dispatches`, ticket: process.env.ticket, body })
           debugger
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body
      }
    } catch (error) {
        debugger
      return {
        statusCode: 500,
        headers: {
          "Access-Control-Allow-Origin": "*", // Allow from anywhere 
        },
        body: "Server side error"
      }
    }


  }

  else {
debugger
    return {
      statusCode: 500,
      body: 'unrecognized HTTP Method, must be one of GET/POST/PUT/DELETE/OPTIONS'
    };
  }

}



async function triggerAction({ ticket, body, gh_action_url }) {


    try {
        const response = await fetch(gh_action_url, {
            method: 'post',
            headers: {
                authorization: `token ${ticket}`,
                Accept: 'application/vnd.github.v3+json'
            },
            body
        })
        const data = await response.json()
        debugger

        return data
    } catch (error) {
        console.log('error',error)
    }

}