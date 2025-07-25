import json
from travel.state import AgentState
from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from travel.search import search_for_places
from travel.trips import add_trips, update_trips, delete_trips
from langchain_core.runnables import RunnableConfig
from langchain_core.messages import AIMessage, ToolMessage
from typing import cast
from langchain_core.tools import tool

@tool
def select_trip(trip_id: str):
    """Select a trip"""
    return f"Selected trip {trip_id}"

llm = ChatOpenAI(model="gpt-4.1-mini")
tools = [search_for_places, select_trip]

async def chat_node(state: AgentState, config: RunnableConfig):
    """Handle chat operations"""
    llm_with_tools = llm.bind_tools(
        [
            *tools,
            add_trips,
            update_trips,
            delete_trips,
            select_trip,
        ],
        parallel_tool_calls=False,
    )

    system_message = f"""
    You are an agent that plans trips and helps the user with planning and managing their trips.
    If the user did not specify a location, you should ask them for a location.
    
    Plan the trips for the user, take their preferences into account if specified, but if they did not
    specify any preferences, call the search_for_places tool to find places of interest, restaurants, and activities.

    Unless the users prompt specifies otherwise, only use the first 10 results from the search_for_places tool relevant
    to the trip.

    When you add or edit a trip, you don't need to summarize what you added. Just give a high level summary of the trip
    and why you planned it that way.
    
    When you create or update a trip, you should set it as the selected trip.
    If you delete a trip, try to select another trip.
    
    When the AI say that it has successfully added the trip. Just provide a high level summary of the trip you had just added now ({json.dumps(state.get('trips', [])[-1])}) and why you planned it that way and do not call any other tools.

    If an operation is cancelled by the user, DO NOT try to perform the operation again. Just ask what the user would like to do now
    instead.

    Current trips: {json.dumps(state.get('trips', []))}
    """

    # calling ainvoke instead of invoke is essential to get streaming to work properly on tool calls.
    response = await llm_with_tools.ainvoke(
        [
            SystemMessage(content=system_message),
            *state["messages"]
        ],
        config=config,
    )

    ai_message = cast(AIMessage, response)

    if ai_message.tool_calls:
        if ai_message.tool_calls[0]["name"] == "select_trip":
            return {
                "selected_trip_id": ai_message.tool_calls[0]["args"].get("trip_id", ""),
                "messages": [ai_message, ToolMessage(
                    tool_call_id=ai_message.tool_calls[0]["id"],
                    content="Trip selected."
                )]
            }

    return {
        "messages": [response],
        "selected_trip_id": state.get("selected_trip_id", None),
        "trips": state.get("trips", [])
    }
