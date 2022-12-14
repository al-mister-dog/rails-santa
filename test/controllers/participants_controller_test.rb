require "test_helper"

class ParticipantsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @participant = participants(:one)
  end

  test "should get index" do
    get participants_url, as: :json
    assert_response :success
  end

  test "should create participant" do
    assert_difference("Participant.count") do
      post participants_url, params: { participant: {  } }, as: :json
    end

    assert_response :created
  end

  test "should show participant" do
    get participant_url(@participant), as: :json
    assert_response :success
  end

  test "should update participant" do
    patch participant_url(@participant), params: { participant: {  } }, as: :json
    assert_response :success
  end

  test "should destroy participant" do
    assert_difference("Participant.count", -1) do
      delete participant_url(@participant), as: :json
    end

    assert_response :no_content
  end

  test "should receive participant and receiver" do
    response = get participant_and_santa_url(@participant), as: :json
    puts response
    assert_response :success
    # assert_includes response.body, "receiver"
  end
end
